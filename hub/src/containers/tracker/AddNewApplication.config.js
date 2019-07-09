import moment from 'moment';

export default class AddNewApplicationConfig {

    emptyStages = [
        { order: 0, completed: false, action: 'First contact', dept: 'Recruitment', startDate: moment().format('DD MMMM YYYY'), endDate: '' },
    ]
    
    emptyContact = [
        {
            contactName: '',
            contactEmail: '',
            contactPhone: '',
        }
    ]

}