// TODO: create here a typescript interface for an olympic country

import { IParticipation } from "./Participation";

//example of an olympic country:
export interface ICountry
{
    id: number,
    country: string,
    participations: IParticipation[]
}
