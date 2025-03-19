
type props={
    message:any
}
export const AddUserMail = ({message}:props) => {
    return `<body style="font-family: 'Poppins', Arial, sans-serif">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 20px">
        <table
          class="content"
          width="600"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="border-collapse: collapse; border: 1px solid #cccccc"
        >
          <!-- Header -->
          <tr>
            <td
              class="header"
              style="
                background-color: #161950;
                padding: 40px;
                text-align: center;
                color: white;
                font-size: 14px;
              "
            >
              <img
                src="http://52.53.157.148:3000/images/logo/tms-dark.svg"
                alt="TTM"
              />
              <br />
              <br />
              We provide a simple transport management system.
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td
              class="body"
              style="
                padding: 40px;
                text-align: left;
                font-size: 16px;
                line-height: 1.6;
              "
            >
              Dear ${message}, <br />
              Welcome to TTM! Your account has been successfully created. 
              <br /><br />
            
              <br />For security reasons, we recommend generate your password
              after logging in.
            </td>
          </tr>

          <!-- Call to action Button -->
          <tr>
            <td style="padding: 0px 40px 0px 40px; text-align: center">
              <!-- CTA Button -->
              <table cellspacing="0" cellpadding="0" style="margin: auto">
                <tr>
                  <td
                    align="center"
                    style="
                      background-color: #6366f1;
                      padding: 10px 20px;
                      border-radius: 5px;
                    "
                  >
                    <a
                      href="${process.env.FRONTEND_URL}/generatepassword"
                      target="_blank"
                      style="
                        color: #ffffff;
                        text-decoration: none;
                        font-weight: bold;
                      "
                      >Generate Password</a
                    >
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td
              class="body"
              style="
                padding: 40px;
                text-align: left;
                font-size: 16px;
                line-height: 1.6;
              "
            >
              <br />
              If you have any questions, feel free to reach out to our support
              team.
              <br /><br />
              Best Regards, <br />TTM Service Team
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td
              class="footer"
              style="
                background-color: #161950;
                padding: 40px;
                text-align: center;
                color: white;
                font-size: 14px;
              "
            >
              Copyright &copy; 2025 | TTM
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
`
}