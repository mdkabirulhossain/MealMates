import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const React_Tabs = () => {
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <TabList>
                <Tab >Title 1</Tab>
                <Tab>Title 2</Tab>
            </TabList>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
        </Tabs>
    );
};

export default React_Tabs;