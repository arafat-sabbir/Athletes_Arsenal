import { z } from "zod";

export const LoginFormValidation = z.object({
   email:z.string().email(),
   password:z.string().min(6,{message:"Password Must Be 6 Characters Long"}),
  });
  