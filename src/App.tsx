import { AgentCard } from "./features/agent/AgentCard";
import styles from "./App.module.css"


function App() {
    return (
        <div className={styles.appContainer}>
            <header>
                <AgentCard />
            </header>
        </div>
    );
}

export default App;
