import React, { useState, useEffect } from "react"
import Link from "next/link"
import ContainerDefault from "~/components/layouts/ContainerDefault"
import ModuleOrderShippingInformation from "~/components/partials/orders/ModuleOrderShippingInformation"
import ModuleOrderBillingInformation from "~/components/partials/orders/ModuleOrderBillingInformation"
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard"
import { connect, useDispatch } from "react-redux"
import { toggleDrawerMenu } from "~/store/app/action"
import { notification, Select, Button, Popconfirm } from "antd"
import OrdersRepository from "~/repositories/OrdersRepository"
import ProductRepository from "~/repositories/ProductRepository"
import { domain } from "~/repositories/Repository"

const { Option } = Select

const OrderDetailPage = ({ oid }) => {
  const dispatch = useDispatch()

  const [order, setOrder] = useState(null)
  const [products, setProducts] = useState([])
  const [newStatus, setNewStatus] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  const updateOrder = async () => {
    if (isUpdating) return
    if (newStatus) {
      if (newStatus === order?.status) {
        notification["warning"]({
          description: "Cannot update to same status",
        })
      } else {
        try {
          setIsUpdating(true)
          await OrdersRepository.updateOrder(oid, `wc-${newStatusS}`)

          notification["success"]({
            message: "Update successful",
          })
        } catch (error) {
          notification["error"]({
            message: "Unable to update order status",
            description: "Please check your data connection and try again",
          })
        } finally {
          setIsUpdating(false)
        }
      }
    } else {
      notification["warning"]({
        description: "Select a new status",
      })
    }
  }

  const getOrder = async () => {
    try {
      const _order = await OrdersRepository.getOrderById(oid)

      try {
        let _products = []
        for (let i = 0; i < _orders.line_items.length; i++) {
          let item = { ..._orders.line_items[i], options: [] }

          const _product = await ProductRepository.getProductByID(
            item.product_id
          )

          item.slug = _product.slug

          if (item.variation_id !== 0) {
            const variant = await ProductRepository.getVariationById(
              item.product_id,
              item.variation_id
            )

            item.options = variant.attributes.map(
              (attribute) => attribute.option
            )
            item.price = variant.price
          }

          _products.push(item)
        }

        setProducts(_products)
      } catch (error) {
        notification["error"]({
          message: "Unable to get products",
          description: "Please check your data connection",
        })
      }

      setOrder(_order)
    } catch (error) {
      notification["error"]({
        message: "Unable to get order",
        description: "Please check your data connection",
      })
    }
  }

  useEffect(() => {
    dispatch(toggleDrawerMenu(false))
    // getOrder()
  }, [])

  return (
    <ContainerDefault title="Order Detail">
      <HeaderDashboard title="Order Detail" description="ShafN Order Detail" />
      <section className="ps-dashboard">
        <div className="ps-section__left">
          <div className="row">
            <div className="col-md-6">
              <ModuleOrderShippingInformation
                shipping={order && order.shipping}
              />
            </div>
            <div className="col-md-6">
              <ModuleOrderBillingInformation billing={order && order.billing} />
            </div>
          </div>
          <div className="ps-card ps-card--track-order">
            <div className="ps-card__header">
              <h4>#{order?.number}</h4>
              <Select
                placeholder="Status"
                className="ps-ant-dropdown"
                listItemHeight={20}
                value={newStatus || order?.status}
                onChange={setNewStatus}
              >
                <Option value="pending">Pending</Option>
                <Option value="processing">Processing</Option>
                <Option value="on-hold">On-hold</Option>
                <Option value="completed">Completed</Option>
                <Option value="cancelled">Cancelled</Option>
                <Option value="refunded">Refunded</Option>
                <Option value="failed">Failed</Option>
              </Select>

              <Popconfirm
                title={`Are you sure you want to update to ${newStatus} status?`}
                onConfirm={updateOrder}
                okText="Yes"
                cancelText="No"
              >
                <Button>Update</Button>
              </Popconfirm>
            </div>
            <div className="ps-card__content">
              <div className="table-responsive">
                <table className="table ps-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Options</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr>
                        <td>
                          <Link
                            href={`${domain}/product/${product.slug}-${product.product_id}`}
                          >
                            <a>{product.name}</a>
                          </Link>
                        </td>
                        <td>{product.options.join(", ")}</td>
                        <td>{product.quantity}</td>
                        <td>
                          {order?.currency_symbol}
                          {product.price}
                        </td>
                        <td>
                          {order?.currency_symbol}
                          {product.price}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="3">
                        <strong>Shipping Charge:</strong>
                      </td>
                      <td>
                        <strong>{order?.shipping_total}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3">
                        <strong>Total:</strong>
                      </td>
                      <td>
                        <strong>{order?.total}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="ps-section__right">
          <div className="ps-card ps-card--track-order">
            <div className="ps-card__header">
              <h4>Track Order</h4>
            </div>
            <div className="ps-card__content">
              <div className="ps-block--track-order">
                <div className="ps-block__header">
                  <div className="row">
                    <div className="col-6">
                      <figure>
                        <figcaption>Order ID:</figcaption>
                        <p>#ABD-235711</p>
                      </figure>
                    </div>
                    <div className="col-6">
                      <figure>
                        <figcaption>Tracking ID:</figcaption>
                        <p>21191818abs1</p>
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="ps-block__content">
                  <div className="ps-block__timeline">
                    <figure className="active">
                      <figcaption>Order Placed</figcaption>
                      <p>
                        Sep 19, 2020 <small>7:00am</small>
                      </p>
                    </figure>
                    <figure className="active">
                      <figcaption>Packed</figcaption>
                      <p>
                        Sep 19, 2020 <small>10:00am</small>
                      </p>
                    </figure>
                    <figure className="active">
                      <figcaption>Shipped</figcaption>
                      <p>
                        Sep 19, 2020 <small>4:00pm</small>
                      </p>
                    </figure>
                    <figure>
                      <figcaption>Delivered</figcaption>
                      <p>Estimated delivery within 1 day</p>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </section>
    </ContainerDefault>
  )
}

OrderDetailPage.getInitialProps = async ({ query }) => {
  return { oid: query.oid }
}

export default connect((state) => state.app)(OrderDetailPage)
