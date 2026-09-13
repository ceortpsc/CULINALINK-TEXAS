package platform

import (
  "context"
  "errors"
  "net/http"
  "os"
  "time"

  "github.com/jackc/pgx/v5/pgxpool"
  "github.com/redis/go-redis/v9"
)

type Config struct { HTTPAddr, DatabaseURL, RedisURL, TemporalAddress string }
func env(k, fallback string) string { if v:=os.Getenv(k); v!="" { return v }; return fallback }
func LoadConfig() (Config,error) {
  c:=Config{HTTPAddr:env("HTTP_ADDR",":8080"),DatabaseURL:os.Getenv("DATABASE_URL"),RedisURL:os.Getenv("REDIS_URL"),TemporalAddress:env("TEMPORAL_ADDRESS","temporal:7233")}
  if c.DatabaseURL=="" { return c, errors.New("DATABASE_URL is required") }
  return c,nil
}

type App struct { db *pgxpool.Pool; redis *redis.Client; mux *http.ServeMux }
func New(ctx context.Context,cfg Config)(*App,error){
  db,err:=pgxpool.New(ctx,cfg.DatabaseURL); if err!=nil{return nil,err}
  if err:=db.Ping(ctx);err!=nil{db.Close();return nil,err}
  var rdb *redis.Client
  if cfg.RedisURL!="" { opt,err:=redis.ParseURL(cfg.RedisURL);if err!=nil{db.Close();return nil,err};rdb=redis.NewClient(opt);pctx,cancel:=context.WithTimeout(ctx,3*time.Second);defer cancel();if err:=rdb.Ping(pctx).Err();err!=nil{db.Close();_ = rdb.Close();return nil,err} }
  a:=&App{db:db,redis:rdb,mux:http.NewServeMux()};a.routes();return a,nil
}
func(a *App)routes(){
  a.mux.HandleFunc("GET /health/live",func(w http.ResponseWriter,_ *http.Request){w.WriteHeader(http.StatusOK);_,_=w.Write([]byte("live"))})
  a.mux.HandleFunc("GET /health/ready",func(w http.ResponseWriter,r *http.Request){ctx,cancel:=context.WithTimeout(r.Context(),2*time.Second);defer cancel();if err:=a.db.Ping(ctx);err!=nil{http.Error(w,"database unavailable",http.StatusServiceUnavailable);return};w.WriteHeader(http.StatusOK);_,_=w.Write([]byte("ready"))})
}
func(a *App)Router()http.Handler{return a.mux}
func(a *App)Close(){if a.redis!=nil{_ = a.redis.Close()};a.db.Close()}
