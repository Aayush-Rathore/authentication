const security = [
  {
    bearerAuth: [],
  },
];

const SignUp = {
  tags: ["User"],
  description: "Create new user account!",
  operationId: "Sign Up",
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            fullName: {
              type: "string",
              example: "Aayush Rathore",
            },

            username: {
              type: "string",
              example: "aayu.r",
            },

            email: {
              type: "string",
              example: "jamanoh745@gexige.com",
            },

            password: {
              type: "string",
              example: "Password@123",
            },

            avatar: {
              type: "file",
              example: "profile.png",
              required: false,
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              successCode: {
                type: "String",
                example: "SUCCESS!",
              },
              successMessage: {
                type: "String",
                example: "Verify your email before login!",
              },
              data: {
                type: "Object",
                example: {
                  message:
                    "Check your inbox and click the provided link to verify you email address!",
                },
              },
            },
          },
        },
      },
    },
  },
};

const Login = {
  tags: ["User"],
  description: "Login user in the system",
  operationId: "login",
  requestBody: {
    content: {
      "application/x-www-form-urlencoded": {
        schema: {
          type: "object",
          properties: {
            username: {
              type: "string",
              example: "aayu.r",
              required: false,
            },
            email: {
              type: "string",
              example: "john@gmail.com",
              required: false,
            },
            password: {
              type: "string",
              example: "Password@123",
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              successCode: {
                type: "String",
                example: "SUCCESSFULLY_LOGED_IN!",
              },
              successMessage: {
                type: "String",
                example: "Welcome to Voice Nest {Your Full Name}!",
              },
              data: {
                type: "Object",
                example: {
                  user: {
                    _id: "65e341e356e65fe4ec899a9f",
                    fullName: "Aayush Rathore",
                    username: "aayu.r",
                    email: "jamanoh745@gexige.com",
                    profileUrl:
                      "https://knowledge.nest.s3.tebi.io/1709392353677_IMG_20231108_130229%283%29.jpg",
                    password:
                      "$2b$08$fttmZ/sbzR.kHMI8Zci.ne3CFsCePJ3xYUbmmQ8FPKQqLqDgG1vOC",
                    isVerified: true,
                    createdAt: "2024-03-02T15:12:35.508Z",
                    updatedAt: "2024-03-02T15:27:39.674Z",
                    __v: 1,
                    refreshToken:
                      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM0MWUzNTZlNjVmZTRlYzg5OWE5ZiIsImlhdCI6MTcwOTM5MzI1OSwiZXhwIjoxNzA5NjUyNDU5fQ.-HNxrEnL2cH6bgcj23_VYMMxtlrdhg2FRp82tC4yGio",
                  },
                  accessToken:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM0MWUzNTZlNjVmZTRlYzg5OWE5ZiIsImVtYWlsIjoiamFtYW5vaDc0NUBnZXhpZ2UuY29tIiwidXNlcm5hbWUiOiJhYXl1LnIiLCJpYXQiOjE3MDkzOTMzMDIsImV4cCI6MTcwOTY1MjUwMn0.BtKT7NU43kuhCMo-xn9CfxLYtfY1sCB5zBClwY3hsgs",
                  refreshToken:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM0MWUzNTZlNjVmZTRlYzg5OWE5ZiIsImlhdCI6MTcwOTM5MzMwMiwiZXhwIjoxNzA5NjUyNTAyfQ.4EYOcIH3hy6YJnBO1wRSQEimqVR0hPhA07lbXdDjVvs",
                },
              },
            },
          },
        },
      },
    },
  },
};

const VerifyEmail = {
  tags: ["User"],
  description: "Verify email with jwt token!",
  operationId: "Verify Email",
  parameters: [
    {
      in: "query",
      name: "token",
      required: true,
      schema: {
        type: "string",
        example:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDNhYmIwZjY2MGZkYzA4MDQ0YWMxZiIsImlhdCI6MTcwODM3MDg2NCwiZXhwIjoxNzA4NjMwMDY0fQ.MqWCzrIDGOdcOJ50VqbQVksEHkDW2Ic8Y_w0Cti9RdI",
      },
      description: "Email verification token",
    },
  ],
  responses: {
    "200": {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              successCode: {
                type: "String",
                example: "EMAIL_VERIFIED!",
              },
              successMessage: {
                type: "String",
                example: "Enjoy exploring voice nest",
              },
              data: {
                type: "Object",
                example: {
                  message: "Email verified! Now you can start exploring.",
                },
              },
            },
          },
        },
      },
    },
  },
};

const ForgetPassword = {
  tags: ["User"],
  description: "Request for a email to reset passowrd through link!",
  operationId: "Forget Password",
  requestBody: {
    content: {
      "application/x-www-form-urlencoded": {
        schema: {
          type: "object",
          properties: {
            username: {
              type: "string",
              example: "aayu.r",
              required: false,
            },
            email: {
              type: "string",
              example: "jamanoh745@gexige.com",
              required: false,
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              successCode: {
                type: "String",
                example: "SUCCESS!",
              },
              successMessage: {
                type: "String",
                example: "Check your email to reset password!",
              },
              data: {
                type: "Object",
                example: {
                  message:
                    "Check your inbox and click the provided link to change your password!",
                },
              },
            },
          },
        },
      },
    },
  },
};

const ResetPassword = {
  tags: ["User"],
  description: "Reset password by using forget password link!",
  operationId: "Reset Password",
  requestBody: {
    content: {
      "application/x-www-form-urlencoded": {
        schema: {
          type: "object",
          properties: {
            password: {
              type: "string",
              example: "Password@123",
              required: true,
            },
          },
        },
      },
    },
    required: true,
  },
  parameters: [
    {
      in: "query",
      name: "token",
      required: true,
      schema: {
        type: "string",
        example:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDNhYmIwZjY2MGZkYzA4MDQ0YWMxZiIsImlhdCI6MTcwODM3MDg2NCwiZXhwIjoxNzA4NjMwMDY0fQ.MqWCzrIDGOdcOJ50VqbQVksEHkDW2Ic8Y_w0Cti9RdI",
      },
      description: "Url varification token",
    },
  ],
  responses: {
    "200": {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              successCode: {
                type: "String",
                example: "SUCCESS!",
              },
              successMessage: {
                type: "String",
                example: "Password changed successfully!",
              },
              data: {
                type: "Object",
                example: {
                  message: "Your new password is updated successfully",
                },
              },
            },
          },
        },
      },
    },
  },
};

export { SignUp, Login, security, VerifyEmail, ForgetPassword, ResetPassword };
