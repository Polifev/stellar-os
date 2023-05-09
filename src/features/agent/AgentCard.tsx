import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getMyAgentAsync, selectAgent } from "./agentSlice";
import styles from "./AgentCard.module.css"
import { useState } from "react";
import { Agent } from "../../spacetraders-sdk";

export function AgentCard() {
    const agent: Agent|null = useAppSelector(selectAgent);
    const dispatch = useAppDispatch();
    const [token, setToken] = useState("");

    return (<div>
        <div className={styles.agentCard}>
            {
                (agent == null) ?
                <>
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