import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Container } from "@decorators/di";
import { MutantService } from "./mutant.service";
import { Response } from "../../domain/models/response.model";
// class MyDDBClient extends DynamoDBClient {
//     send<InputType extends ClientInput, OutputType extends ClientOutput>(command: Command<ClientInput, InputType, ClientOutput, OutputType, SmithyResolvedConfiguration<HandlerOptions>>, options?: HandlerOptions): Promise<OutputType>;
//     send<InputType extends ClientInput, OutputType extends ClientOutput>(command: Command<ClientInput, InputType, ClientOutput, OutputType, SmithyResolvedConfiguration<HandlerOptions>>, cb: (err: any, data?: OutputType) => void): void;
//     send<InputType extends ClientInput, OutputType extends ClientOutput>(command: Command<ClientInput, InputType, ClientOutput, OutputType, SmithyResolvedConfiguration<HandlerOptions>>, options: HandlerOptions, cb: (err: any, data?: OutputType) => void): void;

// }
describe("MutantService", () => {
  let service: MutantService;
  let ddbSendSpy;
  beforeAll(() => {
    service = Container.get(MutantService);

    ddbSendSpy = jest.spyOn((service as any).ddbClient, "send");
  });
  it("should save the answer to data persistence", (done) => {
    const dna = ["XTGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCXTA", "TCACTG"];
    const result: Response = {
      chains: [],
      isMutant: true,
    };
    ddbSendSpy.mockResolvedValueOnce(
      Promise.resolve({
        $metadata: {
          httpStatusCode: 200,
        },
      })
    );
    const response = service.saveDNAResult(dna, result);
    response.subscribe({
      next: (data) => {
        for (const item of data) {
          expect(item.dna.length).toBeGreaterThan(0);
          expect(item.isMutant).not.toBeNull();
        }
        done();
      },
      error: (error) => {},
    });
  });

  it("should get the data from dynamo DB", (done) => {
    const dna = ["XTGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCXTA", "TCACTG"];
    const result: Response = {
      chains: [],
      isMutant: true,
    };
    ddbSendSpy.mockResolvedValueOnce(
      Promise.resolve({
        $metadata: {
          httpStatusCode: 200,
          requestId: "5NH5822V5FFRGKSD18MRSIMGRBVV4KQNSO5AEMVJF66Q9ASUAAJG",
          extendedRequestId: undefined,
          cfId: undefined,
          attempts: 1,
          totalRetryDelay: 0,
        },
        ConsumedCapacity: undefined,
        Count: 1,
        Items: [
          {
            chain: {
              SS: [""],
            },
            mutant: {
              BOOL: true,
            },
            Id: [],
          },
        ],
        LastEvaluatedKey: undefined,
        ScannedCount: 1,
      })
    );
    const response = service.getDNAResults();
    response.subscribe({
      next: (data) => {
        expect(data).toBeTruthy();
        done();
      },
      error: (error) => {},
    });
  });
});
