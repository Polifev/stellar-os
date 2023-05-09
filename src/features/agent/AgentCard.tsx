import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Agent } from "./agentAPI";
import { getMyAgentAsync, selectAgent } from "./agentSlice";
import styles from "./AgentCard.module.css"
import { useState } from "react";

export function AgentCard() {
    const agent: Agent|null = useAppSelector(selectAgent);
    const dispatch = useAppDispatch();
    const [token, setToken] = useState("");

    return (<div>
        <div className={styles.agentCard}>
            {
                (agent == null) ?
                <>
                    <input type="password" value={token} onChange={e => setToken(e.target.value)}/>
                    <button onClick={() => dispatch(getMyAgentAsync(token))}>
                        Load agent
                    </button>
                </> :
                <>
                    <div>
                        Agent: {agent.symbol}
                    </div>
                    <div>
                        Credits: {agent.credits} $
                    </div>
                </>
            }
            
        </div>
    </div>);
}