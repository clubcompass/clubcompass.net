import { GoogleSpreadsheet } from "google-spreadsheet";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updateClubsDB = async (req, res) => {
  const SPREADSHEET_ID = "1AptUkdsZ2oRJqa5PYZz7BSfR9ZL3jqRlw8vp7nw0Nxs";
  const EMAIL = "sheet-reader@clubcompassv2.iam.gserviceaccount.com";
  const PRIVATE_KEY =
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCkpqXXca8ZXkL2\n5k/9N2vC2m60hZbYyKWIPbS17WJOx4r2He7OtzAoAUmvimxAKVKzeNxUDg/co71Q\na9PyQ9CTvgGanBrD6YvMQsqZtCMQ3UJaLmWpn/nkHjoKKCwpljPbwAfvlB6GZ55G\netiFDEdGeaFpuubVqGz1IFkybTrnzThGKH4rjxppDkbFUqbgnOeGVRHeM0H98Pv4\nu3YGOLNqaBPdlFXZyaAn3lqUQhDT2LN6psW78IZ8t4NiZjqb9e/V8hzlzxjF294I\ngJqXI2hU77DNCJACLeNtKNhsMVkEaZlwDcxiAPZITqwUn79XtDKnPofFilWvQXa/\nDl8QtjeBAgMBAAECggEAFIVQlhFtKVQ+NFdwELcfjyF6OrWLn2kieGB4bVQwtHDa\nOOJyKQFb1yCR9nbiFv0PeZ7OlwtJns4pgiRuPfuFu2Qq/wIFs/Ufn02TwqRY2nk5\nE9REh2eQ1YWO5kUre+NkgzbjxlBHnai8aTxWT/6/w2DVZUAOFQLw0Xw+obJLbShL\nQi5k5Gj7izdje26CdJfso1FNHU8I0G4YGpebLvGKWI1XXhnfJz83lcv4YTvtbSpB\nMAZA/iT5BhgsBGC+aMANCa5gZ4caJsjIX+nkAOpgkumb85qz+4XMssBlijjnH5HZ\nYvtDF3P668CAyGuFtCnItOgi2F5Y8nunJw7NwJZBoQKBgQDgakQXosCboBab6jsE\nqdtHlDMkpXX2FU0cc2P/ZGUAg6SUFcxmU8JD2QYbKMpz14MdOsLYwbWlL62bIa4q\nrifGUviWfFTpoFt3qNiV4H2ONCn6ZzJoTcbVGOv9mDtWOMkOiog05yUuFyEIZ6MQ\nvCKFqTdIYG7HAVQktrr9CsPrBwKBgQC70xCPEMV4YpNqE/JXJaG+Lt/4TCqs9bZp\nJxMVJE/FpBP8yf+vTOmPTPpnn/yLZmexAbnFOTpnmTl7Cmk+hMu5YQS+JAoNnUK+\n3HN9+yYudbPyKPNA1XGUdGw8B+lumLKQw0a3vVUQKUxWa6k/CmjndFk+4K6ygiew\nuai7jfg/NwKBgCnZBxuVOO+MWcr3Ucwb1I0zgJn71NRvwnJkvif407DV25HVwsju\nI5K9XJsh7ybM8GE5/O2oqbPFAU2laTICSd58yGhfhQIP6h6VONYyB5fF+HH+XnL+\n1e4U+KTQh3gbnLp+cMnUtKU0oO9NTCYpvxJHrMxtVxr7D3LNNG9NW51vAoGAEf7D\n3GEn+kO/ie9FTbIuT/FfxgNOJ2oXQvXabzEeb3or7BFSbPI6gl9GsnzyjkyObLgU\nm1/DR7+3cSFrOfExL56q/KipSeqiRXULn6tbWiIuzmm7/J82lZmd8RZ0+AKrQRFk\niiAasUSzqqf//Ck8KcjM8ChItJOhx93R275bZXsCgYBQkeLqL6oA6f28PvGCqwzE\nhTpmZW839boS/Qe/VM6mUS13W2hyLBpd+JA8JH1N0VcVkjcOyswngL3g7Yf4Vaqw\nnIUkRTM5nzyWnoIS6LOXuKbF7Mv5SbzGcv8CpIayIGDYh7nr+eI368b7BC7uoPr9\n9VfCLvt4pC0Gz/4/eQJIog==\n-----END PRIVATE KEY-----\n";
  let clubs = [];
  let club_tags = [];

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: EMAIL,
    private_key: PRIVATE_KEY,
  });

  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];

  const rows = await sheet.getRows();

  rows.map((row) => {
    row.tags.split(", ").map((tag) => {
      club_tags.push({ name: tag });
    });

    clubs.push({
      name: row.name,
      president: row.president,
      teacher: row.teacher,
      email: row.email,
      meeting_time: row.meeting_time,
      description: row.description,
      tags: {
        connect: club_tags,
        // upsert: {
        //   create: club_tags,
        //   update: club_tags,
        // },
      },
    });

    club_tags = [];
  });

  let x = 0;

  clubs.map(async (club) => {
    let res = await prisma.club.create({ data: club });
    console.log(res);
    x++;
  });

  console.log(x);

  res.status(200).json({ response: clubs });
};

export default updateClubsDB;
