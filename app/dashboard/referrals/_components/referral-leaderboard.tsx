import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReferralsPayload } from "@/lib/validations/referral";

type LeaderboardData = {
  id: string;
  name: string;
  referrals: number;
}[];

type ReferralLeaderboardProps = { referrals: ReferralsPayload[] };

const initialValue: LeaderboardData = [];

export default function ReferralLeaderboard({
  referrals,
}: ReferralLeaderboardProps) {
  const leaderboardData: LeaderboardData = referrals.reduce(
    (acc, currentRef) => {
      const currentIsPresent = acc.find((x) => x.id === currentRef.referrerId);
      return !currentIsPresent
        ? [
            ...acc,
            {
              id: currentRef.referrerId,
              name: currentRef.referrer.name,
              referrals: 1,
            },
          ]
        : [
            ...acc.filter((x) => x.id !== currentRef.referrerId),
            { ...currentIsPresent, referrals: currentIsPresent.referrals + 1 },
          ];
    },
    initialValue
  );

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Referral Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Position</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Referrals</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData
              .sort((a, b) => b.referrals - a.referrals)
              .map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell className="text-right">{user.referrals}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
