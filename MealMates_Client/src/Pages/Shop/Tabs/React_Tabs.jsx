import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SingleCard from '../../Home/Card/SingleCard';
import useMenu from '../../../hooks/useMenu';

const React_Tabs = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const[menu] = useMenu();
    const pizza = menu.filter(item => item.category ==="pizza")
    const salad = menu.filter(item =>item.category ==="salad")
    const dessert = menu.filter(item =>item.category === "dessert")
    const soup = menu.filter(item=>item.category ==="soup")
    const drinks = menu.filter(item=> item.category === "drinks")
    return (
       <div className=' mx-14 text-center border-0 mb-10'>
         <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <TabList >
                <Tab >SALAD</Tab>
                <Tab>PIZZA</Tab>
                <Tab >SOUPS</Tab>
                <Tab>DESSERTS</Tab>
                <Tab >DRINK</Tab>
            </TabList>
            <TabPanel>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-16'>
                {
                    salad.map(item=><SingleCard
                    key={item._id}
                    item={item}
                    >

                    </SingleCard>)
                }
            </div>
            </TabPanel>
            <TabPanel>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-16'>
                {
                    pizza.map(item=><SingleCard
                    key={item._id}
                    item={item}
                    >

                    </SingleCard>)
                }
            </div>
            </TabPanel>
            <TabPanel>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-16'>
                {
                    soup.map(item=><SingleCard
                    key={item._id}
                    item={item}
                    >

                    </SingleCard>)
                }
            </div>
            </TabPanel>
            <TabPanel>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-16'>
                {
                    dessert.map(item=><SingleCard
                    key={item._id}
                    item={item}
                    >

                    </SingleCard>)
                }
            </div>
            </TabPanel>
            <TabPanel>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-16'>
                {
                    drinks.map(item=><SingleCard
                    key={item._id}
                    item={item}
                    >

                    </SingleCard>)
                }
            </div>
            </TabPanel>
           
        </Tabs>
       </div>
    );
};

export default React_Tabs;