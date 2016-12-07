import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataActions from '../../actions/dataActions';
import * as dataFilterActions from '../../actions/dataFilterActions';
import * as selectFilterActions from '../../actions/selectFilterActions';
import {ProjectFilterDropdown, AdSetFilterDropdown, AdFilterDropdown, CategoryFilterDropdown} from '../../selectors/selectors';
import SelectInput from '../common/SelectInput';
import Data from '../../api/data.js';

export class Filters extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            project: "",
            adSet: "",
            ad: "",
            category: ""
        };

        this.handleProjectChange = this
            .handleProjectChange
            .bind(this);

        this.handleAdSetChange = this
            .handleAdSetChange
            .bind(this);

        this.handleAdChange = this
            .handleAdChange
            .bind(this);

        this.handleCategoryChange = this
            .handleCategoryChange
            .bind(this);
    }

    componentDidMount() {
        this.setState({
            project: this.state.project, 
            adSet: this.state.adSet, 
            ad: this.state.adName,
            category: this.state.category});
    }

    // componentWillReceiveProps(nextProp) {
    //     if(this.props.entireData != nextProp.entireData){     
    //     }
    // }

    componentDidUpdate(prevProps, preState){
        //  console.log("state: " + JSON.stringify(this.state)); 
    }

    changeSelectedOptions(){
        () => this.props.actions.selectFilterOptions({
            project: this.state.project,
            adSet : this.state.adSet,
            ad: this.state.ad,
            category: this.state.category
        })
        .then()
        .catch(error => {});
    }

    handleProjectChange(e) {
        this.setState({project: e.target.value});
        this.changeSelectedOptions();
    }

    handleAdSetChange(e) {
        this.setState({adSet: e.target.value});
        this.changeSelectedOptions();
    }

    handleAdChange(e) {
        this.setState({ad: e.target.value});
        this.changeSelectedOptions();
    }

    handleCategoryChange(e) {
        this.setState({category: e.target.value});
        this.changeSelectedOptions();
    }

    render() {
        return (
            <div className="row filters">
                <div className="col-md-offset-2 col-md-2">
                    <SelectInput
                        name=""
                        label="行銷專案"
                        value={this.state.project}
                        options={this.props.projectOptions}
                        onChange={this.handleProjectChange}/>
                </div>
                <div className="col-md-2">
                    <SelectInput
                        name=""
                        label="廣告組合"
                        value={this.state.adSet}
                        options={this.props.adSetOptions}
                        onChange={this.handleAdSetChange}/>
                </div>
                <div className="col-md-2">
                    <SelectInput
                        name=""
                        label="廣告名稱"
                        value={this.state.ad}
                        options={this.props.adOptions}
                        onChange={this.handleAdChange}/>
                </div>
                <div className="col-md-2">
                    <SelectInput
                        name=""
                        label="成果類型"
                        value={this.state.category}
                        options={this.props.categoryOptions}
                        onChange={this.handleCategoryChange}/>
                </div>
            </div>
        );
    }
}

Filters.propTypes = {
    projectOptions: PropTypes.array,
    adSetOptions: PropTypes.array,
    adOptions: PropTypes.array,
    categoryOptions: PropTypes.array,

    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        projectOptions: ProjectFilterDropdown(state.dataFilters.projects),
        adSetOptions: AdSetFilterDropdown(state.dataFilters.adSets),
        adOptions: AdFilterDropdown(state.dataFilters.ads),
        categoryOptions: CategoryFilterDropdown(state.dataFilters.categories)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(dataActions, dataFilterActions, selectFilterActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);