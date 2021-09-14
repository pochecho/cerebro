import { encrypt } from "./crypto.helpers";
describe("Crypto Helpers", () => {
  it("should encrypt a chain", () => {
    const chain = "Sergio Posada Urrea";

    const response = encrypt(chain);
    expect(response.content).not.toBeNull();
  });
});
