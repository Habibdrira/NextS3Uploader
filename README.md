NextS3Uploader

A Next.js application that enables users to upload files to an AWS S3 bucket and display a list of files stored in the bucket. Built with TypeScript, Tailwind CSS, and the AWS SDK for S3 operations.

Features

Upload files to an AWS S3 bucket through a simple web interface.

Display a list of files stored in the S3 bucket.

Robust error handling for AWS configuration and file upload issues.

Prerequisites

Node.js: Version 18 or higher.

AWS Account: With an S3 bucket and an IAM user with permissions for s3:PutObject, s3:ListBucket, and s3:GetObject.

Git: For version control and GitHub integration.

Setup Instructions

1. Clone the Repository

git clone https://github.com/your-username/NextS3Uploader.git
cd NextS3Uploader

2. Install Dependencies

npm install

3. Configure AWS Credentials

Copy the .env.example file to create a .env.local file:

cp .env.example .env.local

Edit .env.local and fill in your AWS credentials and bucket details:

AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=your_region
S3_BUCKET_NAME=your_bucket_name

Replace your_access_key_id, your_secret_access_key, your_region (e.g., us-east-1), and your_bucket_name with your AWS credentials and bucket details.

Ensure the region matches your S3 bucket's region (check in the AWS S3 console).

4. Configure S3 CORS

In the AWS S3 console, navigate to your bucket's "Permissions" tab and add the following CORS configuration:

[
{
"AllowedHeaders": ["*"],
"AllowedMethods": ["GET", "PUT", "POST"],
"AllowedOrigins": ["http://localhost:3000"],
"MaxAgeSeconds": 3000
}
]

5. Run the Application

npm run dev

Open http://localhost:3000 in your browser to access the application.

Usage

Select a file using the file input field.

Click the "Uploader" button to upload the file to the S3 bucket.

View the list of uploaded files displayed below the upload form.

Project Structure

NextS3Uploader/
├── app/
│ ├── api/
│ │ ├── files/
│ │ │ └── route.ts
│ │ ├── upload/
│ │ │ └── route.ts
│ ├── page.tsx
├── lib/
│ ├── s3Client.ts
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── README.md

Troubleshooting

Error: Invalid region: Verify that AWS_REGION in .env.local matches your bucket's region (e.g., us-east-1). Check the AWS S3 console for the correct region.

Authentication errors: Ensure AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are correct and the IAM user has the required permissions:

{
"Version": "2012-10-17",
"Statement": [
{
"Effect": "Allow",
"Action": ["s3:PutObject", "s3:ListBucket", "s3:GetObject"],
"Resource": ["arn:aws:s3:::your_bucket_name", "arn:aws:s3:::your_bucket_name/*"]
}
]
}

CORS issues: Confirm the CORS configuration is correctly set in the S3 bucket.

Contributing

Fork the repository.

Create a new branch (git checkout -b feature/your-feature).

Commit your changes (git commit -m 'Add your feature').

Push to the branch (git push origin feature/your-feature).

Open a pull request.

License

This project is licensed under the MIT License.
