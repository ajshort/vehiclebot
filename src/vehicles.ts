import { VEHICLES } from "./config";

import { Datastore } from "@google-cloud/datastore";

const datastore = new Datastore();

export async function getVehicleWith(vehicle: string) {
  return datastore.get(datastore.key(["vehicle", vehicle])).then((res) => res[0]);
}

export async function getVehiclesOut() {
  return datastore.runQuery(datastore.createQuery("vehicle")).then((res) => res[0]);
}

export async function setVehicleWith(vehicle: string, wth: string, until: Date, message: string) {
  if (!VEHICLES.includes(vehicle)) {
    throw new Error(`Unknown vehicle ${vehicle}`);
  }

  const key = datastore.key(["vehicle", vehicle]);
  const data = { message, until, vehicle, with: wth };
  await datastore.upsert({ key, data });
}

export async function setVehicleReturned(vehicle: string) {
  await datastore.delete(datastore.key(["vehicle", vehicle]));
}
