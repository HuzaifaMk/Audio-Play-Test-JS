package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/labstack/echo/v4"
)

func GetPresignedURL(sess *session.Session, bucket, key *string) (string, error) {

	svc := s3.New(sess)

	req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
		Bucket: bucket,
		Key:    key,
	})
	urlStr, err := req.Presign(1 * time.Minute)

	if err != nil {
		return "", err
	}

	return urlStr, nil
}

func GeneratePresignedURL(c echo.Context, bucket string, key string) error {

	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("us-east-1")},
	)

	if err != nil {
		fmt.Println("Could not access the region!")
		return nil
	}

	var UrlStr string

	if UrlStr != "" {
		time.Sleep(5 * time.Second)
	}

	UrlStr, err = GetPresignedURL(sess, &bucket, &key)
	if err != nil {
		fmt.Println("Got an error retrieving a presigned URL:")
		return nil
	}

	time.Sleep(5 * time.Second)

	fmt.Println(UrlStr)

	return c.String(http.StatusOK, UrlStr)

}

func GeneratingURL(c echo.Context) error {

	GeneratePresignedURL(c, "testbucket5u3920", "audio.mp3")

	return c.String(http.StatusOK, "")
}
