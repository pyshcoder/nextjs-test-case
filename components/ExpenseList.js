import styled from 'styled-components'
import ExpenseListItems from './ExpenseListItems'

const Container = styled.div`

`
const Header = styled.div`
  input {
    padding: 5px;
  }

  h1 {
    display: inline-block;
    margin-right: 5px;
  }

  span {
    font-size: 0.8em;
    color: #aaa;
  }

  input[type="number"] {
    width: 10%;
    -moz-appearance:textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }

  button {
    display: block;
    width: 10%;
  }
`

export default class ExpenseList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: 0.0,
      items: []
    }

    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  persistState() {
    localStorage.setItem('listState', JSON.stringify(this.state))
  }

  addItem(ev) {
    ev.preventDefault()
    if(this._inputName.value.trim() === '') {
      alert('Item name must not be empty!')
      return
    }

    let price = +(this._inputPrice.value)
    if(isNaN(price)) {
      alert('Item price is not valid!')
      return
    }
    price = parseFloat(price.toFixed(2))
    if(price == 0) {
      alert('Price must be greater than zero!')
      return
    }

    let newItem = {
      name: this._inputName.value.trim(),
      price: price,
      key: Date.now()
    }
    let newAmount = this.state.amount + price

    this.setState(prevState => {
      return {
        amount: newAmount,
        items: prevState.items.concat(newItem)
      }
    }, this.persistState)

    this._inputName.value = ''
    this._inputPrice.value = ''
  }

  removeItem(key) {
    let amount = this.state.amount
    let filtered = this.state.items.filter(item => {
      if(item.key === key) {
        amount -= item.price
        console.log(amount)
        return false
      }
      return true
    })

    if(amount < 0) {
      amount = 0
    }

    this.setState({
      amount: amount,
      items: filtered
    }, this.persistState)
  }

  componentDidMount() {
    let savedState = localStorage.getItem('listState')
    if(savedState !== null) {
      this.setState(JSON.parse(savedState))
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <h1>Expense list</h1>
          <span>Click item to remove</span>
          <form onSubmit={this.addItem}>
            <input ref={(el => this._inputName = el)} placeholder="Item name"></input>
            <input ref={(el => this._inputPrice = el)} placeholder="Price" type="number" min="0.00" max="10000.00" step="0.01"></input>
            <button type="submit">Add</button>
          </form>
          <h2>Total: {this.state.amount.toFixed(2)}$</h2>
        </Header>
        <ExpenseListItems items={this.state.items}
                          removeAction={this.removeItem} />
      </Container>
    )
  }
}
