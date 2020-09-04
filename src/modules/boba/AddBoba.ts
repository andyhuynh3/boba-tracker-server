import { exception } from "console";
import "reflect-metadata";

import { Mutation, Resolver, Arg } from "type-graphql";

import { Boba, BobaModel } from "../../models/Boba";
import { UserModel } from "../../models/User";
import { AddBobaInput } from "./add-boba/AddBobaInput";

@Resolver()
export class AddBobaResolver {
  @Mutation(() => Boba)
  async addBoba(
    @Arg("data") { drinkName, iceLevel, sugarLevel, userId }: AddBobaInput
  ): Promise<Boba> {
    const boba = new BobaModel({
      drinkName,
      iceLevel,
      sugarLevel,
      user: userId,
    });
    const savedBoba = await boba.save();
    const user = await UserModel.findById(userId);
    if (user) {
      user.bobas = [...user.bobas, savedBoba._id];
      await user.save();
    } else {
      throw exception(`Could not find user with id ${userId}`);
    }
    return boba;
  }
}
