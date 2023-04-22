import { MapService } from "../../../src/components/mapService";
import { midGameMap1Move, midGameMap2Move } from "../data/map";

describe("MapService class", () => {
  it("openArea", () => {
    const mapService = new MapService(midGameMap1Move);
    const result = mapService.openArea({ row: 3, column: 7 });
    expect(JSON.stringify(result)).toBe(JSON.stringify(midGameMap2Move));
  });
});
