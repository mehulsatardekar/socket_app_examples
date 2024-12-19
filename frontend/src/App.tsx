import "./App.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { cardsData } from "./data/cards";
import { Link } from "react-router";

function App() {
  return (
    <div className="bg-background text-foreground">
      <div className="flex gap-3">
        {cardsData.map((card) => (
          <div className="w-1/2" key={card.key}>
            <Card className="bg-zinc-950 text-white">
              <CardHeader>
                <CardTitle>{card.cardTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{card.cardContent}</p>
              </CardContent>
              <CardFooter>
                <Link to={card.routeTo} className="w-full">
                  <Button className="w-full bg-white text-black hover:bg-slate-500 hover:text-white">
                    {card.buttonText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
