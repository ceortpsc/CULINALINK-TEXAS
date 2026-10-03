package workflows

import (
  "time"
  "go.temporal.io/sdk/temporal"
  "go.temporal.io/sdk/workflow"
)

type BookingInput struct { BookingID string; CorrelationID string }
type BookingResult struct { State string }

type BookingActivities interface {
  ValidateBooking(id, correlationID string) error
  AwaitProviderDecision(id, correlationID string) error
  AuthorizePayment(id, correlationID string) error
  ConfirmBooking(id, correlationID string) error
}

func BookingWorkflow(ctx workflow.Context,in BookingInput)(BookingResult,error){
  opts:=workflow.ActivityOptions{StartToCloseTimeout:30*time.Second,RetryPolicy:&temporal.RetryPolicy{InitialInterval:time.Second,BackoffCoefficient:2,MaximumInterval:30*time.Second,MaximumAttempts:5}}
  ctx=workflow.WithActivityOptions(ctx,opts)
  var a *BookingActivities
  if err:=workflow.ExecuteActivity(ctx,(*a).ValidateBooking,in.BookingID,in.CorrelationID).Get(ctx,nil);err!=nil{return BookingResult{State:"FAILED_VALIDATION"},err}
  if err:=workflow.ExecuteActivity(ctx,(*a).AwaitProviderDecision,in.BookingID,in.CorrelationID).Get(ctx,nil);err!=nil{return BookingResult{State:"PROVIDER_REVIEW_FAILED"},err}
  if err:=workflow.ExecuteActivity(ctx,(*a).AuthorizePayment,in.BookingID,in.CorrelationID).Get(ctx,nil);err!=nil{return BookingResult{State:"PAYMENT_FAILED"},err}
  if err:=workflow.ExecuteActivity(ctx,(*a).ConfirmBooking,in.BookingID,in.CorrelationID).Get(ctx,nil);err!=nil{return BookingResult{State:"CONFIRMATION_FAILED"},err}
  return BookingResult{State:"CONFIRMED"},nil
}
