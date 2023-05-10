import { AgentCard } from "./features/agent/AgentCard";
import styles from "./App.module.css"
import { ShipList } from "./features/ship/ShipList";


function App() {
    return (
        <div className={styles.appContainer}>
            <header>
                <AgentCard />
            </header>
            <main>
                <ShipList />
            </main>
        </div>
    );
}

export default App;
