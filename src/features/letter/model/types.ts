export interface Letter {
  letterId: string;
  treeId: string;
  title: string;
  content: string;
  nickname: string;
  createdAt: string;
  sticker: number;
  private: boolean;
}

export interface NewLetter {
  title: string;
  content: string;
  sticker: number;
  name: string;
  treeId: number;
  visible: boolean;
}
