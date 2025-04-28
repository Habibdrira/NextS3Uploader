# NextS3Uploader

A Next.js application that enables users to upload files to an AWS S3 bucket and display a list of files stored in the bucket. Built with TypeScript, Tailwind CSS, and the AWS SDK for S3 operations.

## Features

- Upload files to an AWS S3 bucket through a simple web interface.
- Display a list of files stored in the S3 bucket.
- Robust error handling for AWS configuration and file upload issues.

## Prerequisites

- **Node.js**: Version 18 or higher.
- **AWS Account**: With an S3 bucket and an IAM user with permissions for `s3:PutObject`, `s3:ListBucket`, and `s3:GetObject`.
- **Git**: For version control and GitHub integration.

## Setup Instructions

### 1. Clone the Repository

git clone https://github.com/Habibdrira/NextS3Uploader.git
cd NextS3Uploader

### 2. Install Dependencies

npm install

### 3. Configure AWS Credentials

Copy the .env.example file to create a .env.local file:

cp .env.example .env.local

Edit .env.local and fill in your AWS credentials and bucket details:

### 4. Configure S3 CORS

In the AWS S3 console, navigate to your bucket's "Permissions" tab and add the following CORS configuration:

[
{
"AllowedHeaders": ["*"],
"AllowedMethods": ["GET", "PUT", "POST"],
"AllowedOrigins": ["http://localhost:3000"],
"MaxAgeSeconds": 3000
}
]

### 5. Run the Application

npm run dev

Open http://localhost:3000 in your browser to access the application.

## Usage

Select a file using the file input field.
Click the "Uploader" button to upload the file to the S3 bucket.
View the list of uploaded files displayed below the upload form.
