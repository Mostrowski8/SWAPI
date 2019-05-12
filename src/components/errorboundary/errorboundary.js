import React, {Component} from 'react';
import $ from 'jquery';
import Error from '../error';



export default class ErrorBoundary extends Component {
    
    state = { hasError: false, errorMessage: "" };
    
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, info) {
      this.setState({hasError: true, errorMessage: error});
      $('.loading-icon').hide();
      $('.error').show();
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <React.Fragment><Error /><p>Error boundary{this.state.errorMessage}</p></React.Fragment>;
      }
      return this.props.children; 
    }
  }