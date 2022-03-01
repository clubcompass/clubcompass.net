import { updateClubCache } from "../../../utils/cache/updateClubCache";

export default async (req, res) => {
  await updateClubCache();

  res.status(200).json({ response });
};
