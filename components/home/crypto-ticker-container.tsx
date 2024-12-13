import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { getCachedCryptoData } from "@/lib/services/site";
import { numberFormatter } from "@/lib/utils";

export async function CryptoTickerContainer() {
  const cryptoData = await getCachedCryptoData();

  if (cryptoData.length < 1) {
    return null;
  }

  return (
    <Card className="w-full whitespace-nowrap overflow-hidden">
      <CardContent className="p-4">
        <ScrollArea className="w-full whitespace-nowrap overflow-hidden">
          <div className="flex animate-ticker">
            {cryptoData.map((crypto, index) => (
              <TooltipProvider key={`${crypto.id}-${index}`}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="inline-flex items-center space-x-4 px-4">
                      <p>
                        <span>({crypto.cmc_rank})</span> {crypto.name}
                      </p>
                      <span className="font-semibold">
                        {crypto.quote.USD.price.toLocaleString()}
                      </span>

                      <span
                        className={`flex items-center ${
                          crypto.quote.USD.percent_change_24h >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {crypto.quote.USD.percent_change_24h >= 0 ? (
                          <ArrowUpIcon className="h-4 w-4" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4" />
                        )}
                        {Math.abs(crypto.quote.USD.percent_change_24h).toFixed(
                          2
                        )}
                        %
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{crypto.name}</p>
                    <p>
                      Market Cap:
                      {numberFormatter(crypto.quote.USD.market_cap)}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
