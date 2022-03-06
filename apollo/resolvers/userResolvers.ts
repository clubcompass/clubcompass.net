import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Word {
  word: string;
  wordLength: number;
}

export const userResolvers = {
  Query: {
    getWords: async (
      _: any,
      { length, limit }: { length: number; limit: number }
    ): Promise<Word[]> => {
      const words: Word[] = await prisma.word.findMany({
        where: length ? { wordLength: length } : {},
      });
      if (limit) {
        const randomWords: Word[] = [];
        for (let i = 0; i < limit; i++) {
          randomWords.push(words[Math.floor(Math.random() * words.length)]);
        }
        return randomWords;
      }
      return words;
    },
    randomWord: async (
      _: any,
      { length }: { length: number }
    ): Promise<Word> => {
      const words = await prisma.word.findMany({
        where: {
          wordLength: length,
        },
      });
      const randomWord = words[Math.floor(Math.random() * words.length)];
      return randomWord;
    },
    isValidWord: async (
      _: any,
      { word }: { word: string }
    ): Promise<boolean> => {
      const exists = await prisma.word.count({
        where: {
          word: word,
        },
      });
      return exists > 0;
    },
  },

  Mutation: {
    addWord: async (
      _: any,
      { word, wordLength }: { word: string; wordLength: number }
    ): Promise<Word> => {
      const newWord = await prisma.word.create({
        data: {
          word,
          wordLength,
        },
      });
      return newWord;
    },
  },
};
