import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import Text from '@/components/shared_ui/text';
import { useStore } from '@/hooks/useStore';
import { localize } from '@deriv-com/translations';
import { useDevice } from '@deriv-com/ui';
import OnboardTourHandler from '../tutorials/dbot-tours/onboarding-tour';
import Announcements from './announcements';
import Cards from './cards';
import InfoPanel from './info-panel';

type TMobileIconGuide = {
    handleTabChange: (active_number: number) => void;
};

const DashboardComponent = observer(({ handleTabChange }: TMobileIconGuide) => {
    const { load_modal, dashboard, client, google_drive } = useStore();
    const { dashboard_strategies } = load_modal;
    const { is_google_drive_configured } = google_drive;
    const { active_tab, active_tour } = dashboard;
    const has_dashboard_strategies = !!dashboard_strategies?.length;
    const { isDesktop, isTablet } = useDevice();

    return (
    <>
    <div className="tycoon-dashboard">

        <div className="dashboard-header">
            <h1>Tycoon Traders</h1>
            <p>Professional Trading Dashboard</p>
        </div>

        <div className="stats-grid">

            <div className="stat-card">
                <h3>Balance</h3>
                <span>$12,450.00</span>
            </div>

            <div className="stat-card">
                <h3>Equity</h3>
                <span>$12,835.00</span>
            </div>

            <div className="stat-card">
                <h3>Today's Profit</h3>
                <span className="profit">+$385.40</span>
            </div>

            <div className="stat-card">
                <h3>Active Bots</h3>
                <span>6 Running</span>
            </div>

        </div>

        <div className="dashboard-main">

            <div className="market-panel">
                <h2>Live Markets</h2>

                <ul>
                    <li>EUR/USD ▲ 1.1042</li>
                    <li>GBP/USD ▼ 1.2785</li>
                    <li>BTC/USD ▲ 108,540</li>
                    <li>XAU/USD ▲ 3378</li>
                </ul>

            </div>

            <div className="action-grid">

                <Cards has_dashboard_strategies={has_dashboard_strategies} is_mobile={!isDesktop} />

                <InfoPanel />

            </div>

        </div>

        {client.is_logged_in && (
            <Announcements
                is_mobile={!isDesktop}
                is_tablet={isTablet}
                handleTabChange={handleTabChange}
            />
        )}

    </div>

    {active_tab === 0 && (
        <OnboardTourHandler is_mobile={!isDesktop} />
    )}
</>
    );
});

export default DashboardComponent;
