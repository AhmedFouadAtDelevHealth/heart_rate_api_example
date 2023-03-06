function get_filtered_chart(patient_nbr,date_range){
    let URL = 'https://heart-rate-levels-dkxptlko6a-uc.a.run.app/heart_rate_api?patient_nbr=' + patient_nbr + '&date_range=' + date_range
    console.log("URL = ", URL)
    axios({
        method: 'get',
        url: URL ,
        data: {}
    }).then((response) => {
        console.log('=============')
        console.log(response)
        console.log('=============')
        console.log(response.data);
        Plotly.newPlot('card', JSON.parse(response.data.graphJSON) , {});;
    }, (error) => {
    console.log(error);
    });;

}










var minDate1;
var maxdate1;

function  get_chart(patient_nbr,date_range){
    axios({
            method: 'get',
            url: "https://heart-rate-levels-dkxptlko6a-uc.a.run.app/heart_rate_api?patient_nbr="+patient_nbr+"&date_range",

            data: {}
        }).then((response) => {
            // The response will containe a "mindate" , "mindate" and graphJSON is the plot it self
            let minDate1 = response.data.mindate
            let maxdate1 = response.data.maxdate

            // Create the Daterange Picker
            var example =  flatpickr('#flatpickr', {
            dateFormat: "Y-m-d",
            minDate:    minDate1,
            maxDate:    maxdate1 ,
            mode: "range",
            disableMobile: "true",

            // onChange: function(selectedDates, dateStr, instance) {},
            // onOpen: [function(selectedDates, dateStr, instance){},  function(selectedDates, dateStr, instance){} ],
            onClose: function(selectedDates, dateStr, instance){
                console.log("Start Date =", selectedDates[0])
                console.log('============================================================= ' )
                console.log("End Date   =", selectedDates[1])
            
            if (selectedDates[0] == undefined){
                console.log('There is no date selected :)')
            }else{
                get_filtered_chart(patient_nbr, selectedDates)
            }
            
            }
        });
        // Plot The Chart
        Plotly.newPlot('card', JSON.parse(response.data.graphJSON)  , {});;

        }, (error) => {
        console.log(error);
        });;

    }


// here is the patient_nbr that you want to get the data for him in this Example i wanna get the data for patient_nbr = 01-001
get_chart(patient_nbr="01-001" ,date_range='')

