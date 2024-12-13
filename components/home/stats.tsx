import { Shell } from "@/components/dashboard/shell";
import { getCachedSiteStats } from "@/lib/services/site";
import { numberFormatter } from "@/lib/utils";

async function Stats() {
  const siteSats = await getCachedSiteStats();

  return (
    <Shell>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-16">
        <div className="text-center">
          <h3 className="font-cal text-3xl">
            {numberFormatter(siteSats.users)}
          </h3>
          <p className="font-light text-muted-foreground">Total Users</p>
        </div>
        <div className="text-center">
          <h3 className="font-cal text-3xl">
            {numberFormatter(siteSats.investments)}
          </h3>
          <p className="font-light text-muted-foreground">Total Investments</p>
        </div>
        <div className="text-center">
          <h3 className="font-cal text-3xl">
            ${numberFormatter(siteSats.totalValue)}
          </h3>
          <p className="font-light text-muted-foreground">Total Value Locked</p>
        </div>
      </div>
    </Shell>
  );
}

export default Stats;
