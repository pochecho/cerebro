import { createCipheriv, randomBytes, createDecipheriv } from "crypto";

const algorithm = "aes-256-ctr";
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
const iv = '0123456789012345';

export const encrypt = (text) => {
  const cipher = createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv,
    content: encrypted.toString("hex"),
  };
};

export const decrypt = (hash) => {
  const decipher = createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
};
