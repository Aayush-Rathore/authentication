import ApiError from "./apiError.utils";
import { Queue } from "bullmq";

const emailQueue = new Queue("emial-queue", {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  },
});

const sendMail = async (
  fullName: string,
  email: string,
  subject: string,
  token: string
): Promise<void> => {
  try {
    emailQueue.add(`${Date.now()}`, { fullName, email, subject, token });
  } catch (error) {
    throw new ApiError(
      500,
      "UNABLE_TO_SEND_VERIFICATION_MAIL",
      "Something went wrong while send verification mail",
      error
    );
  }
};

export default sendMail;
