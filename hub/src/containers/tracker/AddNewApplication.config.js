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

    fillInApplicationModel(data) {
        return {
            _id: data._id,
            status: {
                value: data.value,
                text: data.text,
            },
            company: data.company,
            role: data.role,
            salary: data.salary,
            applicationUrl: data.applicationUrl || '',
            location: data.location || '' ,
            contacts: this.emptyContact,
            stages: this.emptyStages,
            files: data.files,
            description: data.description,
        }
    }

}