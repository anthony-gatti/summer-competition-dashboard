import Countdown from './Countdown';
import './Header.css';

export default function Header() {
    return (
        <div className='header'>
            <div className='header-item1'>
                <span className='title'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="logo-icon">
                        <title>view-dashboard</title>
                        <path d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />
                    </svg>Summer Competition Scoreboard
                </span>
            </div>
            <Countdown targetDate="2024-08-02T17:30:00" />
            <div className='header-item3'>By team/By individual</div>
        </div>
    );
}