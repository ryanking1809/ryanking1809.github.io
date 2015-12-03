var ProjectDropdown = React.createClass({

      getInitialState: function(){
         return {
           dropdownOpen: false
         }
      },

      toggleDropdown: function(name) {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
      },

      render: function(){
        var click = this.toggleDropdown
        return (
          <div className="proj-select-wrapper">
           <div className={this.state.dropdownOpen ? "proj-select expanded": "proj-select"} onClick={click}>
            <div className="proj-select-text">
            <p className="cost-text">Projects</p>
            <p className="proj-text">15-001: Walsh Street - A.1: Concept Design</p>
            </div>
            <div className="proj-select-arrow"><i className="fa fa-chevron-down"></i></div>
           </div>

           {this.state.dropdownOpen ? <Dropdown /> : ''}

         </div>
        );
      }
    });


    var Dropdown = React.createClass({
      

      render: function(){
        return(
        <div className="proj-select-dropdown">
          <div className="proj-select-dropdown-search">
          <input type="text" className="proj-select-dropdown-search-input" value="" placeholder="Search projects or select cost-centre below" />
          <i className="fa fa-search"></i>
          </div>
          <div className="proj-select-dropdown-back"><i className="fa fa-chevron-left"></i><span>Marketing</span></div>
          <div className="proj-select-dropdown-scroll">
            <div className="proj-select-dropdown-text">Test Test Test Test Test Test Test Test Test Test Test Test Test</div>
            <div className="proj-select-dropdown-text">Test</div>
            <div className="proj-select-dropdown-text">Test</div>
            <div className="proj-select-dropdown-text">Test</div>
            <div className="proj-select-dropdown-text">Test</div>
            <div className="proj-select-dropdown-text">Test</div>
            <div className="proj-select-dropdown-text">Test</div>
            <div className="proj-select-dropdown-text">Test</div>
          </div>
          <div className="proj-select-dropdown-button"><i className="fa fa-plus"></i><span>Add Project</span>
          </div>
        </div>
        );
        }
    });

    React.render(<ProjectDropdown/>, $('body')[0])
    