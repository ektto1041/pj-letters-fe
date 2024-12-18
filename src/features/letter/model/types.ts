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

export interface LetterInTree {
  letterId: number;
  nickname: string;
  title: string;
  sticker: number;
  visible: boolean;
  createdAt: string;
  modifiedAt: string;
}
