package main

import (
  "context"
  "log"
  "net/http"
  "os"
  "os/signal"
  "syscall"
  "time"

  "github.com/ceortpsc/culinalink-texas/services/go/internal/platform"
)

func main() {
  cfg, err := platform.LoadConfig()
  if err != nil { log.Fatal(err) }
  app, err := platform.New(context.Background(), cfg)
  if err != nil { log.Fatal(err) }
  defer app.Close()

  srv := &http.Server{Addr: cfg.HTTPAddr, Handler: app.Router(), ReadHeaderTimeout: 5*time.Second, ReadTimeout: 15*time.Second, WriteTimeout: 30*time.Second, IdleTimeout: 60*time.Second}
  go func() {
    log.Printf("culinalink api listening on %s", cfg.HTTPAddr)
    if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed { log.Fatal(err) }
  }()

  sig := make(chan os.Signal, 1)
  signal.Notify(sig, syscall.SIGINT, syscall.SIGTERM)
  <-sig
  ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
  defer cancel()
  _ = srv.Shutdown(ctx)
}
