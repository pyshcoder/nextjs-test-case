import styled from 'styled-components'

const List = styled.ul`
  li span {
    font-style: italic;
    color: #aaa;
  }
`

export default class ExpenseListItems extends React.Component {
  remove(key) {
    this.props.removeAction(key)
  }

  render() {
    let jsx = <p>No items to show</p>

    if(this.props.items.length > 0) {
      let listItems = this.props.items.map(item => {
        return <li key={item.key} onClick={() => this.remove(item.key)}>{item.name} - <span>{item.price}$</span></li>
      })
      jsx = <List>{listItems}</List>
    }

    return jsx
  }
}
