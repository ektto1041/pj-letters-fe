import { Letter } from "@/features/letter";
import { User } from "@/features/user";

export interface Tree {
  treeId: string;
  treeName: string;
  user: Omit<User, "token">;
  letters: Letter[];
}
