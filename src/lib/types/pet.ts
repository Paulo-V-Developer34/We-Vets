import { Pet, Dono } from "../../../generated/prisma"

export type PetType = Pet & { dono: Dono | null }
