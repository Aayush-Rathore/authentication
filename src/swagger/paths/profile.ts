const security = [
  {
    bearerAuth: [],
  },
];

const UpdatePassword = {
  tags: ["Profile"],
  description: "Create new user account!",
  operationId: "Sign Up",
  requestBody: {
    content: {
      "application/x-www-form-urlencoded": {
        schema: {
          type: "object",
          properties: {
            oldPassword: {
              type: "string",
              example: "Password@123",
            },

            newPassword: {
              type: "string",
              example: "Aayush@123",
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
                example: "Password changed successfully!",
              },
              data: {
                type: "Object",
                example: {
                  message: "Your new password is updated successfully!",
                },
              },
            },
          },
        },
      },
    },
  },
};

const LogOut = {
  tags: ["Profile"],
  description: "Login user in the system",
  operationId: "login",
  responses: {
    "200": {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              successCode: {
                type: "String",
                example: "LOGED_OUT!",
              },
              successMessage: {
                type: "String",
                example: "Loged out successfully!",
              },
              data: {
                type: "Object",
                example: {
                  message: "Logout successfully! By by",
                },
              },
            },
          },
        },
      },
    },
  },
};

export { UpdatePassword, LogOut, security };
