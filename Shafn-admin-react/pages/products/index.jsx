import React, { useEffect, useState, useRef } from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import TableProjectItems from "~/components/shared/tables/TableProjectItems";
import { Select, Spin, Pagination, notification } from "antd";
import Link from "next/link";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { connect, useDispatch } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";
import { CustomModal } from "~/components/elements/custom/index";
import ProductRepository from "~/repositories/ProductRepository";
import ReactHtmlParser from "react-html-parser";
import DefaultLayout from "~/components/layouts/DefaultLayout";

const { Option } = Select;
const ProductPage = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [filterParams, setFilterParams] = useState({
    category: "",
    type: "",
    status: "",
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const searchMemo = useRef({});

  const filter = async (e) => {
    e.preventDefault();

    const params = {
      page: 1,
      per_page: 10,
      category: filterParams.category,
      type: filterParams.type,
      status: filterParams.status,
    };

    try {
      setIsFiltering(true);
      const products = await ProductRepository.getProducts(params);
      if (products && products.items.length > 0) {
        setProducts(products);
      } else {
        notification["info"]({
          message: "No match for filter params",
        });
      }
    } catch (error) {
      notification["error"]({
        message: "Unable to filter",
        description:
          error.response === undefined
            ? ReactHtmlParser(String(error))
            : ReactHtmlParser(error.response.data.message),
      });
    } finally {
      setIsFiltering(false);
    }
  };

  const search = async (e) => {
    e.preventDefault();

    if (searchMemo.current[searchKeyword]) {
      const products = searchMemo.current[searchKeyword];
      setProducts(products);
    } else {
      const params = {
        page: 1,
        per_page: 10,
        search: searchKeyword,
      };
      setIsSearching(true);

      try {
        const products = await ProductRepository.getProducts(params);
        if (products && products.items.length > 0) {
          searchMemo.current[searchKeyword] = products;
          setProducts(products);
        } else {
          notification["info"]({
            message: "No search result",
          });
        }
      } catch (error) {
        notification["error"]({
          message: "Unable to search product",
          description:
            error.response === undefined
              ? ReactHtmlParser(String(error))
              : ReactHtmlParser(error.response.data.message),
        });
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handlePagination = async (page, pageSize) => {
    setCurrentPage(page);
    const params = {
      page,
      per_page: pageSize,
    };

    try {
      const products = await ProductRepository.getProducts(params);
      setProducts(products);
    } catch (error) {
      notification["error"]({
        message: "Unable to get products",
        description: "Please check your data connection and try again.",
      });
    }
  };

  const getProducts = async () => {
    const params = {
      page: 1,
      per_page: 10,
    };

    try {
      const products = await ProductRepository.getProducts(params);
      const categories = await ProductRepository.getCategories();

      setCategories(categories);
      setProducts(products);
    } catch (error) {
      notification["error"]({
        message: "Unable to get products",
        description: "Please check your data connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
    getProducts();
  }, []);
  return (
    <DefaultLayout>
      <ContainerDefault title="Products">
        <CustomModal isOpen={false}>
          <Spin />
        </CustomModal>
        <HeaderDashboard
          title="Products"
          description="ShafN Product Listing "
        />
        <section className="ps-items-listing">
          <div className="ps-section__actions">
            <Link href="/products/create-product">
              <a className="ps-btn success">
                <i className="icon icon-plus mr-2" />
                New Product
              </a>
            </Link>
          </div>
          <div className="ps-section__header">
            <div className="ps-section__filter">
              <form className="ps-form--filter">
                <div className="ps-form__left">
                  <div className="form-group">
                    <Select
                      placeholder="Category"
                      className="ps-ant-dropdown"
                      listItemHeight={20}
                      onChange={(value) =>
                        setFilterParams((params) => ({
                          ...params,
                          category: value,
                        }))
                      }
                    >
                      {categories &&
                        categories.map((category) => (
                          <Option key={category.id} value={category.id}>
                            {ReactHtmlParser(category.name)}
                          </Option>
                        ))}
                    </Select>
                  </div>
                  <div className="form-group">
                    <Select
                      placeholder="Type"
                      className="ps-ant-dropdown"
                      listItemHeight={20}
                      onChange={(value) =>
                        setFilterParams((params) => ({
                          ...params,
                          type: value,
                        }))
                      }
                    >
                      <Option value="simple">Simple Product</Option>
                      <Option value="variable">Variable product</Option>
                    </Select>
                  </div>
                  <div className="form-group">
                    <Select
                      placeholder="Status"
                      className="ps-ant-dropdown"
                      listItemHeight={20}
                      onChange={(value) =>
                        setFilterParams((params) => ({
                          ...params,
                          status: value,
                        }))
                      }
                    >
                      <Option value="draft">Draft</Option>
                      <Option value="pending">Pending</Option>
                      <Option value="publish">Publish</Option>
                    </Select>
                  </div>
                </div>
                <div className="ps-form__right">
                  <button
                    className="ps-btn ps-btn--gray"
                    onClick={filter}
                    disabled={isFiltering}
                  >
                    {isFiltering ? (
                      <Spin style={{ marginTop: 5 }} />
                    ) : (
                      <>
                        <i className="icon icon-funnel mr-2"></i>
                        Filter
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            <div className="ps-section__search">
              <form className="ps-form--search-simple">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search product"
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button onClick={search} disabled={isSearching}>
                  {isSearching ? (
                    <Spin style={{ marginTop: 5 }} />
                  ) : (
                    <i className="icon icon-magnifier"></i>
                  )}
                </button>
              </form>
            </div>
          </div>
          <div className="ps-section__content">
            <TableProjectItems products={products} page={currentPage} />

            {loading && <Spin />}

            {products && Number(products.totalItems) === 0 && (
              <p>No products yet</p>
            )}

            {products && Number(products.totalItems) > 0 && (
              <div className="ps-section__footer">
                <Pagination
                  total={products && products.totalItems}
                  pageSize={10}
                  responsive={true}
                  current={currentPage}
                  onChange={handlePagination}
                />
              </div>
            )}
          </div>
        </section>
      </ContainerDefault>
    </DefaultLayout>
  );
};
export default connect((state) => state.app)(ProductPage);
