import React, { Component } from 'react';
import { getProductsByKeyword } from '../../../store/product/action';
import ProductResult from '../../elements/products/ProductSearchResult';
import { connect } from 'react-redux';
import SpeechRecognition from '~/components/elements/SpeechRecognition';
<<<<<<< HEAD
// import SpeechRecognition from '~/wp-components/shared/headers/modules/SpeechRecognition';
=======
>>>>>>> a9f4f952c7d341f5e998066a9fefab5706165e0c

class PanelSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchPanel: false,
            searchProducts: [],
            keyword: '',
        };
    }

    searchByProductName = (keyword, object) => {
        let matches = [];
        let regexp = new RegExp(keyword.toLowerCase(), 'g');

        object.forEach((product) => {
            if (product.title.toLowerCase().match(regexp))
                matches.push(product);
        });

        return matches;
    };

    handleSubmit(e) {
        e.preventDefault();
        const keyword = this.state.keyword;
        Router.push(`/search?keyword=${keyword}`);
    }
    handleSearch = (e) => {
        if (e.target.value !== '') {
            const keyword = e.target.value;
            this.props.dispatch(getProductsByKeyword(keyword));
            this.setState({
                searchPanel: true,
                keyword: e.target.value,
            });
        } else {
            this.setState({ searchPanel: false, searchProducts: [] });
        }
    };
    render() {
        const { searchProducts, keyword } = this.state;
        const { searchResults } = this.props;
        return (
            <div className="ps-panel__search-results">
                <form
                    className="ps-form--search-mobile ps-form--quick-search"
                    action="/"
                    method="get">
                    <div className="form-group--nest ps-form__input">
                        <input
                            value={keyword}
                            className="form-control"
                            type="text"
                            placeholder="Search something..."
                            onChange={this.handleSearch}
                        />
                        <span className="ps-form__action">
                            <SpeechRecognition
                                onListening={(transcript) =>
                                    this.handleSearch({
                                        target: { value: transcript },
                                    })
                                }
                            />
                        </span>
                    </div>
                    <button>
                        <i className="icon-magnifier"></i>
                    </button>
                </form>
                {searchResults &&
                    searchResults.map((product) => (
                        <ProductResult product={product} key={product.id} />
                    ))}
            </div>
        );
    }
}

export default connect((state) => state.product)(PanelSearch);
