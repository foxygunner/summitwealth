import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type StatsCardProps = { title: string; value: string };

function StatsCard({ title, value }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

export default StatsCard;
