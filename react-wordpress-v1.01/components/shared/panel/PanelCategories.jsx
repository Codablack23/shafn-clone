import React, { Component } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';

const categories = [

    {id: 16, name: 'Fashion', slug: 'fashion',} ,
    {id: 24, name: 'Clothing', slug: 'clothing',} ,
    {id: 22, name: 'Fabrics', slug: 'fabrics',} ,
    {id: 73, name: 'Beauty & Cosmetics', slug: 'beauty-cosmetic',} ,
    {id: 74, name: 'Books', slug: 'books',} ,
    {id: 71, name: 'Groceries', slug: 'groceries',} ,
    {id: 18, name: 'Home & Living', slug: 'home-living',} ,
    {id: 20, name: 'Toys & Entertainment', slug: 'toys-entertainment',} ,
    {id: 17, name: 'Accessories', slug: 'jewelry-accessories',} ,
    {id: 21, name: 'Art', slug: 'art',} ,
    {id: 19, name: 'Wedding & Party', slug: 'wedding-party'}, 
    
   ]

const { SubMenu } = Menu;

class PanelCategories extends Component {
    constructor(props) {
        super(props);
    }

    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        openKeys: ['sub1'],
    };
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(
            key => this.state.openKeys.indexOf(key) === -1
        );
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render() {
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}>
                {categories.map(category => (
                    <Menu.Item key={category.id}>
                        <a href={`/shop?category=${category.slug}`}>
                            {category.name}
                        </a>
                    </Menu.Item>
                ))}
            </Menu>
        );
    }
}

export default PanelCategories;
