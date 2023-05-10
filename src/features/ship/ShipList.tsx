import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Agent, Ship } from "../../spacetraders-sdk";
import { listMyShips, selectShips } from "./shipSlice";

export function ShipList() {
    const ships: Array<Ship> = useAppSelector(selectShips);
    const dispatch = useAppDispatch();

    return (<div>
        <div>
            <button onClick={() => {
                dispatch(listMyShips());
            }}>
                Load ships
            </button>
            <ul>
                {ships.map(ship => <li>{ship.symbol}</li>)}
            </ul>
        </div>
    </div>);
}