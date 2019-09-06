import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Navbar = styled.div`
  position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background: #f6f6f6;
	z-index: 10000;
	height: 60px;
  margin: 0 auto;
  padding: 0 2em;

  h1, nav a {
    line-height: 60px;
  }

  h1 {
    text-transform: uppercase;
    color: #333;
    letter-spacing: 4px;
    font-size: 2em;
    margin: 0;
    float: left;
    pointer-events: none;
  }

  nav {
    float: right;
    padding-right: 2.5em;
  }

  nav a {
    color: #aaa;
    font-weight: 700;
    margin: 0 0 0 20px;
    font-size: 1.4em;
    text-decoration: none;
  }

  nav a:hover {
    color: #333;
  }
`

export default class Layout extends React.Component {
  render () {
    const { children } = this.props
    return (
      <div className='layout'>
        <Navbar>
          <h1>Logo</h1>
          <nav>
            <Link href="/index">
              <a>Home</a>
            </Link>
            <Link href="/about">
              <a>About</a>
            </Link>
          </nav>
        </Navbar>
        <div style={{marginTop: '80px'}}>
          {children}
        </div>
      </div>
    )
  }
}
