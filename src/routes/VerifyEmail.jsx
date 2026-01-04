import React from 'react'

const VerifyEmail = () => {
  return (
    <div>
        <h1>Please verify your email address</h1>
{/ */}
<form>
    <label htmlFor="verificationCode">Verification Code:</label>    
    <input type="text" id="verificationCode" name="verificationCode" required />
    <button type="submit">Verify Email</button>
</form>

    </div>
  )
}

export default VerifyEmail