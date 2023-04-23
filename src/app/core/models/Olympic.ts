
import { Participation } from "./Participation";

//example of an olympic country:
export interface Olympic
{
    id: number,
    country: string,
    participations: Participation[]
}
